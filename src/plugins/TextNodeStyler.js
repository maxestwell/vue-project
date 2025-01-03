export default {
  install(app) {
    app.directive('text-node-styler', {
      mounted(el, binding) {
        const semanticTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'] // Add more semantic tags as needed

        // Function to get all text nodes in the element
        const getAllTextNodes = (root) => {
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false)
          const textNodes = []
          let node

          while ((node = walker.nextNode())) {
            if (node.nodeValue.trim() !== '') {
              textNodes.push(node)
            }
          }

          return textNodes
        }

        const processedParents = new Set() // Track processed parents to avoid re-applying styles

        // Function to determine if a parent or span should be ignored
        const shouldIgnore = (element) => {
          return (
            element &&
            (element.classList.contains('message-container') ||
              element.classList.contains('text-node-ignore'))
          )
        }

        // Function to find the nearest semantic parent for a given text node
        const findNearestSemanticParent = (node) => {
          let parent = node.parentElement
          while (parent && !semanticTags.includes(parent.tagName) && parent !== el) {
            if (shouldIgnore(parent)) {
              return null
            }
            parent = parent.parentElement
          }
          return parent
        }

        // Function to apply styles to the nearest semantic parent of each text node
        const styleTextNodes = (root) => {
          const textNodes = getAllTextNodes(root)
          textNodes.forEach((node) => {
            const parent = findNearestSemanticParent(node)
            if (parent && !processedParents.has(parent) && !shouldIgnore(parent)) {
              processedParents.add(parent)
              parent.classList.add('text-node-parent')

              // Create a span element
              const span = document.createElement('span')
              span.classList.add('text-node-span') // Add class to the span

              // Move all child elements of the parent into the span
              while (parent.firstChild) {
                span.appendChild(parent.firstChild)
              }

              // Append the span to the parent
              parent.appendChild(span)
            }
          })
        }

        // Initial pass to style the text nodes
        styleTextNodes(el)

        // Notify that styling is done
        if (binding.value && typeof binding.value === 'function') {
          binding.value()
        }

        // Set up a Mutation Observer to handle dynamic content
        const observer = new MutationObserver(() => {
          styleTextNodes(el)
          // Notify that styling is done
          if (binding.value && typeof binding.value === 'function') {
            binding.value()
          }
        })

        observer.observe(el, { childList: true, subtree: true })
      },
    })
  },
}
