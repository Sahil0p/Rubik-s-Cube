// class Cube {
//   constructor() {
//     // Initial solved state: [U, R, F, D, L, B]
//     this.faces = {
//       U: Array(9).fill('w'),
//       R: Array(9).fill('r'),
//       F: Array(9).fill('g'),
//       D: Array(9).fill('y'),
//       L: Array(9).fill('o'),
//       B: Array(9).fill('b')
//     };
//     this.moveHistory = [];
//   }

//   getStateString() {
//     return Object.values(this.faces).map(face => face.join('')).join('');
//   }

//   render() {
//     const svg = getCubeSvg(this.getStateString());
//     document.getElementById('cube-display').innerHTML = svg;
//   }

//   rotateFace(face, clockwise = true) {
//     // Rotate face itself (indices hardcoded)
//     const rotate = arr => {
//       return clockwise
//         ? [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]]
//         : [arr[2], arr[5], arr[8], arr[1], arr[4], arr[7], arr[0], arr[3], arr[6]];
//     };
//     this.faces[face] = rotate(this.faces[face]);

//     // Side rotation logic simplified
//     // Only U face rotation as an example
//     if (face === 'U') {
//       const [F, R, B, L] = ['F', 'R', 'B', 'L'];
//       const temp = [...this.faces[F].slice(0, 3)];
//       if (clockwise) {
//         this.faces[F].splice(0, 3, ...this.faces[L].slice(0, 3));
//         this.faces[L].splice(0, 3, ...this.faces[B].slice(0, 3));
//         this.faces[B].splice(0, 3, ...this.faces[R].slice(0, 3));
//         this.faces[R].splice(0, 3, ...temp);
//       } else {
//         this.faces[F].splice(0, 3, ...this.faces[R].slice(0, 3));
//         this.faces[R].splice(0, 3, ...this.faces[B].slice(0, 3));
//         this.faces[B].splice(0, 3, ...this.faces[L].slice(0, 3));
//         this.faces[L].splice(0, 3, ...temp);
//       }
//     }

//     this.moveHistory.push(face + (clockwise ? '' : "'"));
//     this.render();
//   }

//   randomScramble(moves = 20) {
//     const faces = ['U', 'R', 'F', 'D', 'L', 'B'];
//     for (let i = 0; i < moves; i++) {
//       const face = faces[Math.floor(Math.random() * 6)];
//       const clockwise = Math.random() > 0.5;
//       this.rotateFace(face, clockwise);
//     }
//   }

//   solve() {
//     // Naive solver: simply reverse the moves
//     const reverseMoves = [...this.moveHistory].reverse();
//     reverseMoves.forEach(move => {
//       const face = move[0];
//       const clockwise = !(move.length > 1 && move[1] === "'");
//       this.rotateFace(face, !clockwise);
//     });
//     this.moveHistory = [];
//   }
// }

// // Dummy method to simulate SVG generation (replace with real one if provided)
// function getCubeSvg(stateString) {
//   return `<pre style="font-size: 16px;">${stateString}</pre>`;
// }

// // Helper to shuffle and then solve
// function shuffleAndSolve() {
//   const cube = new Cube();
//   cube.render();
//   cube.randomScramble();
//   setTimeout(() => {
//     alert("Solving...");
//     cube.solve();
//   }, 1000);
// }




class Cube {
    constructor() {
      this.faces = {
        U: Array(9).fill('w'),
        R: Array(9).fill('r'),
        F: Array(9).fill('g'),
        D: Array(9).fill('y'),
        L: Array(9).fill('o'),
        B: Array(9).fill('b')
      };
      this.moveHistory = [];
    }
  
    getStateString() {
      return Object.values(this.faces).map(face => face.join('')).join('');
    }

    rotateFace(face, clockwise = true) {
        const rotate = arr =>
          clockwise
            ? [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]]
            : [arr[2], arr[5], arr[8], arr[1], arr[4], arr[7], arr[0], arr[3], arr[6]];
      
        this.faces[face] = rotate(this.faces[face]);
      
        // Helper to rotate adjacent edges
        const move = (faces, idxs) => {
          const temp = idxs.map((i, j) => this.faces[faces[0]][i]);
          if (clockwise) {
            for (let i = 0; i < 3; i++) {
              this.faces[faces[0]][idxs[i]] = this.faces[faces[3]][idxs[i]];
              this.faces[faces[3]][idxs[i]] = this.faces[faces[2]][idxs[i]];
              this.faces[faces[2]][idxs[i]] = this.faces[faces[1]][idxs[i]];
              this.faces[faces[1]][idxs[i]] = temp[i];
            }
          } else {
            for (let i = 0; i < 3; i++) {
              this.faces[faces[0]][idxs[i]] = this.faces[faces[1]][idxs[i]];
              this.faces[faces[1]][idxs[i]] = this.faces[faces[2]][idxs[i]];
              this.faces[faces[2]][idxs[i]] = this.faces[faces[3]][idxs[i]];
              this.faces[faces[3]][idxs[i]] = temp[i];
            }
          }
        };
      
        const f = this.faces;
        let temp;
      
        switch (face) {
          case 'U':
            move(['F', 'R', 'B', 'L'], [0, 1, 2]);
            break;
          case 'D':
            move(['F', 'L', 'B', 'R'], [6, 7, 8]);
            break;
          case 'F':
            temp = [
              [f['U'][6], f['U'][7], f['U'][8]],
              [f['R'][0], f['R'][3], f['R'][6]],
              [f['D'][2], f['D'][1], f['D'][0]],
              [f['L'][8], f['L'][5], f['L'][2]]
            ];
            if (clockwise) {
              [f['U'][6], f['U'][7], f['U'][8]] = temp[3];
              [f['R'][0], f['R'][3], f['R'][6]] = temp[0];
              [f['D'][2], f['D'][1], f['D'][0]] = temp[1];
              [f['L'][8], f['L'][5], f['L'][2]] = temp[2];
            } else {
              [f['U'][6], f['U'][7], f['U'][8]] = temp[1];
              [f['R'][0], f['R'][3], f['R'][6]] = temp[2];
              [f['D'][2], f['D'][1], f['D'][0]] = temp[3];
              [f['L'][8], f['L'][5], f['L'][2]] = temp[0];
            }
            break;
          case 'B':
            temp = [
              [f['U'][2], f['U'][1], f['U'][0]],
              [f['L'][0], f['L'][3], f['L'][6]],
              [f['D'][6], f['D'][7], f['D'][8]],
              [f['R'][8], f['R'][5], f['R'][2]]
            ];
            if (clockwise) {
              [f['U'][2], f['U'][1], f['U'][0]] = temp[3];
              [f['L'][0], f['L'][3], f['L'][6]] = temp[0];
              [f['D'][6], f['D'][7], f['D'][8]] = temp[1];
              [f['R'][8], f['R'][5], f['R'][2]] = temp[2];
            } else {
              [f['U'][2], f['U'][1], f['U'][0]] = temp[1];
              [f['L'][0], f['L'][3], f['L'][6]] = temp[2];
              [f['D'][6], f['D'][7], f['D'][8]] = temp[3];
              [f['R'][8], f['R'][5], f['R'][2]] = temp[0];
            }
            break;
          case 'L':
            temp = [
              [f['U'][0], f['U'][3], f['U'][6]],
              [f['F'][0], f['F'][3], f['F'][6]],
              [f['D'][0], f['D'][3], f['D'][6]],
              [f['B'][8], f['B'][5], f['B'][2]]
            ];
            if (clockwise) {
              [f['U'][0], f['U'][3], f['U'][6]] = temp[3];
              [f['F'][0], f['F'][3], f['F'][6]] = temp[0];
              [f['D'][0], f['D'][3], f['D'][6]] = temp[1];
              [f['B'][8], f['B'][5], f['B'][2]] = temp[2];
            } else {
              [f['U'][0], f['U'][3], f['U'][6]] = temp[1];
              [f['F'][0], f['F'][3], f['F'][6]] = temp[2];
              [f['D'][0], f['D'][3], f['D'][6]] = temp[3];
              [f['B'][8], f['B'][5], f['B'][2]] = temp[0];
            }
            break;
          case 'R':
            temp = [
              [f['U'][8], f['U'][5], f['U'][2]],
              [f['B'][0], f['B'][3], f['B'][6]],
              [f['D'][8], f['D'][5], f['D'][2]],
              [f['F'][8], f['F'][5], f['F'][2]]
            ];
            if (clockwise) {
              [f['U'][8], f['U'][5], f['U'][2]] = temp[3];
              [f['B'][0], f['B'][3], f['B'][6]] = temp[0];
              [f['D'][8], f['D'][5], f['D'][2]] = temp[1];
              [f['F'][8], f['F'][5], f['F'][2]] = temp[2];
            } else {
              [f['U'][8], f['U'][5], f['U'][2]] = temp[1];
              [f['B'][0], f['B'][3], f['B'][6]] = temp[2];
              [f['D'][8], f['D'][5], f['D'][2]] = temp[3];
              [f['F'][8], f['F'][5], f['F'][2]] = temp[0];
            }
            break;
        }
      
        this.moveHistory.push(face + (clockwise ? '' : "'"));
        this.render();
      }
      
  
    scramble(moves = 20) {
      const faces = ['U', 'R', 'F', 'D', 'L', 'B'];
      for (let i = 0; i < moves; i++) {
        const face = faces[Math.floor(Math.random() * faces.length)];
        const clockwise = Math.random() > 0.5;
        this.rotateFace(face, clockwise);
      }
    }
  
    solve() {
      const reverse = [...this.moveHistory].reverse();
      let index = 0;
  
      const step = () => {
        if (index >= reverse.length) {
          this.moveHistory = [];
          return;
        }
  
        const move = reverse[index];
        const face = move[0];
        const clockwise = !(move.length > 1 && move[1] === "'");
        this.rotateFace(face, !clockwise);
        index++;
        setTimeout(step, 300);
      };
  
      step();
    }
  
    render() {
      const cubeDiv = document.getElementById('cube-display');
      cubeDiv.innerHTML = getCubeSvg(this.getStateString());
    }
  }
  
//   function getCubeSvg(stateString) {
//     return `<pre>${stateString}</pre>`;
//   }
  
function getCubeSvg(stateString) {
    const colorMap = {
      w: 'black',
      r: 'red',
      g: 'green',
      y: 'gold',
      o: 'orange',
      b: 'blue'
    };
  
    return `
      <div class="color-string">
        ${[...stateString].map(char =>
          `<span style="color:${colorMap[char]}; font-weight:bold;">${char}</span>`).join('')}
      </div>
    `;
  }
  

  const cube = new Cube();
  cube.render();
  
  function rotate(face) {
    cube.rotateFace(face);
  }
  
  function scramble() {
    cube.scramble();
  }
  
  function solve() {
    cube.solve();
  }
  