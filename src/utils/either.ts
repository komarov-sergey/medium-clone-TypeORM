// const Either = Right || Left

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
})

const fromNullable = x => (x != null ? Right(x) : Left(null))

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

async function tryCatchAsync(f) {
  try {
    const result = await f()
    return Promise.resolve(Right(result))
  } catch (e) {
    return Promise.reject(Left(e))
  }
}

export { Left, Right, fromNullable, tryCatch, tryCatchAsync }
