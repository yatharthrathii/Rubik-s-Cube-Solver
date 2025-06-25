class RubiksCube {
    constructor() {
        this.faces = {
            U: Array(9).fill('w'),
            D: Array(9).fill('y'),
            F: Array(9).fill('g'),
            B: Array(9).fill('b'),
            L: Array(9).fill('o'),
            R: Array(9).fill('r')
        };
        this.steps = [];
    }

    rotate(face, direction = 'clockwise') {
        this.steps.push(`Rotate ${face} ${direction}`);
        const oldFace = [...this.faces[face]];
        const newFace = [];
        if (direction === 'clockwise') {
            newFace[0] = oldFace[6];
            newFace[1] = oldFace[3];
            newFace[2] = oldFace[0];
            newFace[3] = oldFace[7];
            newFace[4] = oldFace[4];
            newFace[5] = oldFace[1];
            newFace[6] = oldFace[8];
            newFace[7] = oldFace[5];
            newFace[8] = oldFace[2];
        } else {
            newFace[0] = oldFace[2];
            newFace[1] = oldFace[5];
            newFace[2] = oldFace[8];
            newFace[3] = oldFace[1];
            newFace[4] = oldFace[4];
            newFace[5] = oldFace[7];
            newFace[6] = oldFace[0];
            newFace[7] = oldFace[3];
            newFace[8] = oldFace[6];
        }
        this.faces[face] = newFace;
    }

    scramble(moves = 20) {
        const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
        for (let i = 0; i < moves; i++) {
            const face = faces[Math.floor(Math.random() * 6)];
            const dir = Math.random() > 0.5 ? 'clockwise' : 'anticlockwise';
            this.rotate(face, dir);
        }
    }

    solve() {
        this.steps.push("Solving cube...");
        this.rotate('F');
        this.rotate('R');
        this.rotate('U');
        this.rotate('R', 'anticlockwise');
        this.rotate('U', 'anticlockwise');
        this.steps.push("Cube Solved (placeholder)");
    }

    getState() {
        return Object.values(this.faces).flat().join('');
    }

    getSteps() {
        return this.steps;
    }
}

const cube = new RubiksCube();

function getCubeSvg(state) {
    const output = document.getElementById("cube-output");
    output.innerHTML = '';
    const face = state.slice(0, 9); // Show one face (Up) as preview
    const grid = document.createElement('div');
    grid.className = 'cube-grid';
    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.className = 'tile';
        div.style.backgroundColor = colorMap[face[i]] || '#fff';
        grid.appendChild(div);
    }
    output.appendChild(grid);
}

const colorMap = {
    w: 'white',
    y: 'yellow',
    g: 'green',
    b: 'blue',
    o: 'orange',
    r: 'red'
};

function handleScramble() {
    cube.scramble();
    getCubeSvg(cube.getState());
    document.getElementById("steps-output").textContent = "Scrambled!";
}

function handleSolve() {
    cube.solve();
    getCubeSvg(cube.getState());
    document.getElementById("steps-output").textContent = "Solved (placeholder)!";
}

function showSteps() {
    document.getElementById("steps-output").textContent = cube.getSteps().join(" → ");
}