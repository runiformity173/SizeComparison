import random
from bisect import insort
from sys import setrecursionlimit
setrecursionlimit(10000)
class Node:
	def __init__(self):
		self.count = 0
		self.zero = None
		self.one = None
	def add(self, string):
		if len(string) == 0:
			self.count += 1
			return
		if string[0] == "0":
			if not self.zero:
				self.zero = Node()
			self.zero.add(string[1:])
		else:
			if not self.one:
				self.one = Node()
			self.one.add(string[1:])
		self.count += 1
	def findNext(self, depth):
		if depth == 0: return ""
		r = -1
		if not self.one and not self.zero:
			r = random.randint(0,1)
		if self.one and not self.zero or r == 0:
			self.zero = Node()
			return "0"+self.zero.findNext(depth-1)
		elif self.zero and not self.one or r == 1:
			self.one = Node()
			return "1"+self.one.findNext(depth-1)
		else:
			if self.one.count == self.zero.count:
				if random.random() < 0.5:
					return "0"+self.zero.findNext(depth-1)
				else:
					return "1"+self.one.findNext(depth-1)
			elif self.one.count > self.zero.count:
				return "0"+self.zero.findNext(depth-1)
			else:
				return "1"+self.one.findNext(depth-1)
uuids = []
tree = Node()
def findAndAdd(length, amount):
	for i in range(amount):
		uuid = tree.findNext(length)
		tree.add(uuid)
		insort(uuids,hex(int(uuid,2))[2:].zfill(length//4))
findAndAdd(32, 256)
print(uuids)