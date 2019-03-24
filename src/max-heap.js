const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let node  = new Node(data, priority);
		this.insertNode(node);
		this.heapSize++;
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.isEmpty()) return;

		let detachedRoot = this.detachRoot();
		this.heapSize--;
		this.restoreRootFromLastInsertedNode(detachedRoot);

		if (this.root) {
			this.shiftNodeDown(this.root);
		}

		return detachedRoot.data;
	}

	detachRoot() {
		let root = this.root;

		if (root.left) {
			root.left.parent = null;
		}

		if (root.right) {
			root.right.parent = null;
		}

		let indexRoot = this.parentNodes.indexOf(root);

		if (indexRoot !== -1) {
			this.parentNodes.splice(indexRoot, 1);
		}

		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!this.parentNodes.length) return;

		let root = this.parentNodes.pop();

		if (detached.left !== root) {
			root.appendChild(detached.left);
		}

		if (detached.right !== root) {
			root.appendChild(detached.right);
		}

		if (!root.left || !root.right) {
			this.parentNodes.unshift(root);
		}

		let rootParent = root.parent;

		if (rootParent) {
			rootParent.removeChild(root);

			if (!rootParent.left || !rootParent.right) {
				this.parentNodes.unshift(rootParent);
			}
		}
		this.root = root;
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}

		if (!this.parentNodes[0].left) {
			this.parentNodes[0].left = node;
			node.parent = this.parentNodes[0];
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].right = node;
			node.parent = this.parentNodes[0];
			this.parentNodes.push(node);
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			return;
		}

		if (node.parent.priority >= node.priority) return;

		let nodeIndex = this.parentNodes.indexOf(node);
		let nodeParentIndex = this.parentNodes.indexOf(node.parent);

		if (nodeIndex !== -1 && nodeParentIndex === -1) {
			this.parentNodes[nodeIndex] = node.parent;
		}

		if (nodeIndex !== -1 && nodeParentIndex !== -1) {
			this.parentNodes[nodeIndex] = node.parent;
			this.parentNodes[nodeParentIndex] = node;
		}

		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if (!node.left && !node.right) return;

		let child = null;

		if (node.left && node.right) {
			if (node.left.priority > node.right.priority) {
				child = node.left;
			} else {
				child = node.right;
			}
		} else if (node.left) {
			child = node.left;
		} else if (node.right) {
			child = node.right;
		}

		if (child.priority <= node.priority) return;

		if (this.root === node){
			this.root = child;
		}

		let nodeIndex = this.parentNodes.indexOf(node);
		let childIndex = this.parentNodes.indexOf(child);

		if (nodeIndex === -1 && childIndex !== -1) {
			this.parentNodes[childIndex] = node;
		}
		if (nodeIndex !== -1 && childIndex !== -1) {
			this.parentNodes[nodeIndex] = child;
			this.parentNodes[childIndex] = node;
		}

		child.swapWithParent();
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
