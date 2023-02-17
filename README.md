# qquuee

simple typesafe queue

## Quick start

Install it:

```bash
npm i qquuee
# or
yarn add qquuee
# or
pnpm add qquuee
```

Use it:

```ts
import Q from 'qquuee'

const delay = <T>(value: T, time: number) =>
  new Promise<T>(resolve => 
    setTimeout(
      () => resolve(value), 
      time
    )
  )

const q = new Q()

q.add(() => delay(0, 1000))
q.add(() => delay(1, 500))

// after 1000ms: 0
// after 500ms:  1
```

```ts
const task = q.add(() => delay(0, 1000))
task // will be typed Promise<number>
```