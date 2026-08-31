// const MasterData: {
//   [key: string]: {
//     level?: number;
//     title: string;
//     children?: string[];
//   };
// } = {
//   '1': {
//     level: 1,
//     title: '1',
//     children: ['2', '3', '4'],
//   },
//   '2': {
//     title: '1.1',
//     children: ['5', '6'],
//   },
//   '3': {
//     title: '1.2',
//     children: ['7', '8'],
//   },
//   '4': {
//     title: '1.3',
//     children: ['9', '10'],
//   },
//   '5': {
//     title: '1.1.1',
//   },
//   '6': {
//     title: '1.1.2',
//   },
//   '7': {
//     title: '1.2.1',
//   },
//   '8': {
//     title: '1.2.2',
//   },
//   '9': {
//     title: '1.3.1',
//   },
//   '10': {
//     title: '1.3.2',
//   },
// };

// // find out the first level parent nodes
// const firstLevelNodes = Object.entries(MasterData)
//   .filter(([key, value]) => value.level == 1)
//   .map((value) => value[0]);

// // print each parent node
// firstLevelNodes.forEach((key) => {
//   drawTree(key);
// });

// function drawTree(key: string) {
//   // Logic : Print the given node with its childen.
//   // Note : if any of the child has own children, then call this
//   // code recursively treating that child as parent
//   const value = MasterData[key];
//   console.log(value.title);
//   if (Array.isArray(value.children)) {
//     value.children.map((child) => {
//       if (Array.isArray(MasterData[child].children)) {
//         drawTree(child);
//       } else {
//         console.log(MasterData[child].title);
//       }
//     });
//   }
// }
