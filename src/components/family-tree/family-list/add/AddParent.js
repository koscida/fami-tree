export default function AddParent({}) {
	/*
	look for the 1 familyGroup as a child
	parent
		I. 0 parents, 0 siblings
			(A) create familyGroup, add parent
		II. 1+ parent, 0 siblings
			(B) add parent to familyGroup
		III. 1 parent, 1+ siblings
			i. all full-siblings
				(B) add parent to familyGroup
			ii. some half-siblings
				a. select siblings
					(C) create new familyGroup, add parent, add sibling(s)
			iii. no half-siblings
				(D) create new familyGroup, add parent
		IV. 2 parents
			(E) error
	*/
	return <>Add parent</>;
}
