
export default function asyncFunction (duraction, errorMessage) {
  let resolve
  let error
  const promise = new Promise((res, e) => {
    resolve = res
    error = e
  })
  setTimeout(() => {
    return errorMessage ? error(errorMessage) : resolve()
  }, duraction || 2000)

  return promise
}