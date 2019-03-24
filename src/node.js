class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!node) return;

		if (this.left && this.right) return;

		if (!this.left) {
			this.left = node;
		} else {
			this.right = node;
		}

		node.parent = this;
	}

	removeChild(node) {
		if (!node) return;

		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw 'Error';
		}
	}

	remove() {
		if (!this.parent) return;

		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) return;

		let child = this;
		let parent = this.parent;
		let grandParent = parent.parent;
		let cLeft = child.left;
		let cRight = child.right;
		let pLeft = parent.left;
		let pRight = parent.right;

		if (grandParent) {
			child.parent = grandParent;
			if (grandParent.left === parent){
				grandParent.left = child;
			} else {
				grandParent.right = child;
			}
		} else {
			child.parent = null;
		}

		if (pLeft === child) {
			child.left = parent;
			child.right = pRight ? pRight : null;
			if (pRight) {
				pRight.parent = child;
			}
		} else {
			child.right = parent;
			child.left = pLeft;
			pLeft.parent = child;
		}

		parent.left = cLeft ? cLeft : null;
		parent.right = cRight ? cRight : null;
		parent.parent = child;

		if(cLeft && cRight){
			cLeft.parent = parent;
			cRight.parent = parent;
		} else if (cLeft) {
			cLeft.parent = parent;
		} else if(cRight){
			cRight.parent = parent;
		}
	}
}

module.exports = Node;
