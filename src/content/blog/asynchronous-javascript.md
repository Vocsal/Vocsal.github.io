---
title: "异步过程中try catch处理"
description: "异步过程中try catch处理"
pubDate: 2023-06-16 16:00:00 +0800
heroImage: "/images/blog-placeholder-2.jpg"
categories: [JavaScript]
tag: [JavaScript]
---

## 一、异步过程在 web 开发中的重要性

1. **提高响应性能**：通过使用异步操作，可以在后台执行耗时的任务，而不会阻塞用户界面。这样可以确保用户能够流畅地与网页进行交互，而不会因为等待任务完成而出现冻结或卡顿的现象。常见的异步操作包括网络请求、文件上传、数据处理和计算等。

2. **改善用户体验**：通过异步加载内容，例如图片、音频、视频或其他资源，可以加快页面加载速度，并提供更好的用户体验。异步加载可以避免长时间等待大量资源下载完毕，使用户能够更快地浏览和交互网页。

3. **实现实时更新**：异步过程使得实时数据更新成为可能。通过使用轮询、长轮询、WebSocket 或服务器推送等技术，我们可以实时获取服务器端的数据更新，并在客户端及时地反映这些变化，从而实现实时性的应用程序，例如聊天应用、实时协作工具等。

4. **并行处理**：异步操作可以在同时进行多个任务，从而提高系统的并行处理能力。这对于处理大量数据、并发请求或复杂计算等场景非常有用。通过合理地使用异步过程，我们可以提高系统的性能和吞吐量。

5. **提高可维护性和扩展性**：异步操作的模块化和可组合性使得代码更易于维护和扩展。通过将任务拆分为小的异步操作，并使用适当的异步处理技术（如 Promise、async/await 等），我们可以将复杂的任务分解为更小的模块，提高代码的可读性、可维护性和重用性。

## 二、异步过程中 try catch 的作用

1. **异常捕获**：try-catch 允许我们在异步代码块中捕获和处理异常。当异步操作中发生错误或抛出异常时，try 块中的代码将被执行，而 catch 块中的代码将负责处理异常。这样可以避免异常在异步操作中传播并导致整个应用崩溃或出现意外行为。

2. **错误处理**：通过 try-catch 语句，我们可以及时处理异步操作中的错误，从而提供更好的用户体验。当异步操作失败或产生错误时，我们可以在 catch 块中执行适当的操作，例如向用户显示错误信息、记录错误日志或采取其他补救措施。

3. **错误传递**：try-catch 语句还允许我们将捕获的错误传递给上层调用或其他处理逻辑。这对于异步操作链中的错误处理非常有用。通过在 catch 块中重新抛出错误，我们可以将错误传递给下一个错误处理器或全局错误处理机制，以便进一步处理或进行适当的错误处理。

4. **异常信息收集**：使用 try-catch 语句，我们可以捕获并获取有关异常的详细信息，例如错误消息、堆栈跟踪等。这些信息对于调试和排查问题非常有帮助，可以帮助开发人员更好地理解发生的错误，并进行更准确的故障排除。

## 三、try catch 的性能相关

1. **执行时间**：try-catch 块的执行会引入额外的成本，因为在 try 块中发生异常时，需要执行额外的操作来捕获和处理异常。这可能会导致代码的执行时间延长。在相同的代码逻辑下，不使用 try-catch 通常会更快。

2. **堆栈跟踪**：当异常被抛出时，try-catch 语句会生成堆栈跟踪信息，用于追踪异常发生的位置。生成堆栈跟踪信息可能会带来一些性能开销，尤其是当代码中频繁抛出异常时。不使用 try-catch 可以减少堆栈跟踪的生成。

3. **V8 引擎优化**：对于某些 JavaScript 引擎（如 V8），存在一种称为“优化退化（deoptimization）”的机制。当代码中包含 try-catch 语句时，引擎可能会减少对代码的优化，从而影响代码的执行性能。这是因为 try-catch 可能会导致一些优化技术无法应用于代码块。

## 四、异步过程中错误处理的实践与优化

1. **使用 Promise 的 catch 方法**：使用 promise.catch 方法可以不抛出异常，且不中断程序，这样有利于代码逻辑的运行，处理一些非必要异常，如下面示例：

```javascript
loading.value = true;
let res = await getList().catch(() => (loading.value = false));
if (!res) return;
// 请求成功后正常操作
```

2. **转换异步过程，使其不抛出异常**：将异步过程的返回结果和异常错误组合成一个数组进行返回，这样有两种情况，成功为`[data, undefined]`，异常时为`[undefined, error]`，这样可以确保转换后的异步过程不会有异常，且可让使用方自行觉得是否处理异常，封装方法如下：

```typescript
/** 获取Promise Resolved值的类型 */
type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;
/** 获取异步函数resolved返回值类型 */
type ReturnedPromiseResolvedType<T> = PromiseResolvedType<ReturnType<T>>;
/**
 * 异步函数持续化，不会抛出错误，不会终止流程
 * @param promiseFn 异步函数
 * @returns [异步结果，undefined] 或者 [undefined, error]
 */
export function promiseCatcher<T extends (...args: any[]) => Promise<any>>(
  promiseFn: T
): (
  ...args: Parameters<T>
) => Promise<[ReturnedPromiseResolvedType<T>, Error]> {
  return async (...params: Parameters<T>) => {
    try {
      const result = await promiseFn.call(this, ...params);
      return [result, undefined];
    } catch (error) {
      return [undefined, error];
    }
  };
}
```

## 五、总结

1. **在关键代码段使用 try-catch**：仅在关键代码段中使用 try-catch，而不是在整个应用的每个地方都使用。这可以减少 try-catch 的执行次数。

2. **精确捕获特定类型的异常**：尽量精确地捕获与当前上下文相关的异常，避免不必要的通用异常捕获。这有助于减少 try-catch 的执行和性能开销。

3. **错误处理的异步优化**：对于异步操作，使用适当的错误回调函数（error-first callback）或 Promise 的 catch 方法来处理错误。这样可以避免使用 try-catch 捕获异步操作中的错误。

4. **运行时环境优化**：了解你所使用的 JavaScript 引擎的特点，例如 V8 引擎的优化机制。了解引擎的行为可以帮助你更好地优化和调整代码。
