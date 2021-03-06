export class LinkedListNode<T> {
  data: T;
  next: LinkedListNode<T>;

  constructor (data: T) {
    this.data = data;
  }
}

export class LinkedList<T> {
  private _head: LinkedListNode<T>;
  get head(): T {
    return this._head.data;
  }

  private _length = 0;
  get length(): number {
    return this._length;
  }

  get tail(): T {
    return this.get(this._length - 1);
  }

  constructor(head?: T) {
    if (head) {
      this.push(head);
    }
  }

  push(value: T) {
    const node = new LinkedListNode<T>(value);
    
    let current: LinkedListNode<T>;
    if (!this._head) {
      this._head = node;
    } else {
      current = this._head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this._length++;
  }

  /**
   * inserts a node at the specified index and returns the inserted node value 
   * @param value 
   * @param n 
   */
  insert(value: T, n: number): T {
    if (n < 0 || n > this._length - 1) {
      return null;
    }

    const node = new LinkedListNode<T>(value);
    let previous: LinkedListNode<T>;
    let current = this._head;
    let i = 0;

    if (!n) {
      this._head = node;
    } else {
      while (i++ < n) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
    }
    node.next = current;
    this._length++;
    return node.data;
  }
  
  /**
   * removes a node at the specified index and returns the replaced node value 
   * @param value 
   * @param n 
   */
  replace(value: T, n: number): T {    
    if (n < 0 || n > this._length - 1) {
      return null;
    }

    const node = new LinkedListNode<T>(value);
    let previous: LinkedListNode<T>;
    let current = this._head;
    let i = 0;

    if (!n) {
      this._head = node;
    } else {
      while (i++ < n) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
    }
    node.next = current.next;
    return current.data;
  }

  /**
   * removes a node at the specified index and returns the removed node value 
   * @param n 
   */
  remove(n: number): T {    
    if (n < 0 || n > this._length - 1) {
      return null;
    }

    let previous: LinkedListNode<T>;
    let current = this._head;
    let i = 0;

    if (!n) {
      this._head = current.next;
    } else {
      while (i++ < n) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this._length--;
    return current.data;
  }
  
  clear() {
    this._head = null;
    this._length = 0;
  }

  get(n: number): T {    
    if (n < 0 || n > this._length - 1) {
      return null;
    }

    let current = this._head;
    let i = 0;
    while (i++ < n) {
      current = current.next;
    }
    return current.data;
  }  

  pop(): T {
    return this.remove(this._length - 1);
  }

  has(value: T, comparator?: (a: T, b: T) => boolean): boolean {
    if (!this._length) {
      return false;
    }

    comparator ||= (a: T, b: T) => a === b;
    
    let current = this._head;
    let i = 0;
    while (i < this._length) {
      if (comparator(value, current.data)) {
        return true;
      }
      current = current.next;
      i++;
    }
    return false;
  }
  
  findIndex(value: T, comparator?: (a: T, b: T) => boolean): number {
    if (!this._length) {
      return -1;
    }
    
    comparator ||= (a: T, b: T) => a === b;
    
    let current = this._head;
    let i = 0;
    while (i < this._length) {
      if (comparator(value, current.data)) {
        return i;
      }
      current = current.next;
      i++;
    }
    return -1;
  }
 
  *[Symbol.iterator]() {
    let current = this._head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

}
