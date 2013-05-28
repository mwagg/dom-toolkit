(defn function?
  "True if parameter is a function."
  [x]
  (identical? (typeof x) :function))

(defn resolve
  "If given a function returns the result of invoking that function. 
  Otherwise returns the value as is."
  [x]
  (if (function? x)
    (x)
    x
    )
  )

(defn- no-param-memoize
  "Memoizes the function in a naive fashion. 
  The function does not consider varying parameters when memoizing."
  [x]
  (do
    (def value null)
    (fn []
      (if (identical? value null)
        (set! value (x)))
      value)))

(defn set-attribute
  "Sets the value of the attribute on the target."
  [target attr value]
  (set! (get (resolve target) (resolve attr)) (resolve value)))
