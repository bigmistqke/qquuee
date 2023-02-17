type Task<T> = {
  callback: () => T;
  resolve: (result: T) => void;
};

export default class Q {
  private queue: Task<any>[] = [];
  private inProcess = false;

  private process = async () => {
    this.inProcess = true;

    try {
      const result = await this.queue[0].callback();
      this.queue[0].resolve(result);
    } catch (err) {
      console.error("error while processing a task: ", err);
    }

    this.queue.splice(0, 1);

    if (this.queue.length != 0) this.process();
    else this.inProcess = false;
  };

  add = async <T>(callback: () => T) =>
    new Promise<T>(resolve => {
      if (typeof callback !== "function") {
        console.error("callback is not a function");
      } else {
        const task: Task<T> = { callback, resolve };
        this.queue.push(task);
        if (!this.inProcess) this.process();
      }
    });
}
