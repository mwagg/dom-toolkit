(defn query
  "Returns a function which returns the DOM element found by querying for the provided selected."
  [selector memoize]
  (let [query (fn [] (document.querySelector selector))]
    (if memoize
      (no-param-memoize query)
      query)))

(defn add-class
  "Adds a class to an elements class list."
  [element class-name]
  (do
    (let [resolved-element (resolve element)
          resolved-class-name (resolve class-name)]
      (resolved-element.classList.add resolved-class-name))
    element))

(defn set-text-content
  [element content]
  (set-attribute element :textContent content))
