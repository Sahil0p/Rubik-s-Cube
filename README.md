# 🧩 Rubik's Cube Solver

An interactive **Rubik’s Cube Solver** built entirely with **HTML, CSS, and JavaScript** (no external libraries or frameworks).

This project provides:
- A clean UI with buttons to rotate each face (`U`, `R`, `F`, `D`, `L`, `B`)
- Color-coded text-based cube representation
- `Scramble` and `Solve` functionality
- An object-oriented cube logic with move history tracking

---

## 📸 Demo Preview


Each letter is color-coded to visually represent standard Rubik’s Cube face colors:
- `w` – White
- `r` – Red
- `g` – Green
- `y` – Yellow
- `o` – Orange
- `b` – Blue

---

## 🛠️ Technologies Used

- ✅ HTML5 – UI structure
- ✅ CSS3 – Styling & responsive layout
- ✅ JavaScript (ES6) – Cube logic, rotations, and solving algorithm

---

## 📂 File Structure

```yaml
rubiks-cube-solver/
  ├── index.html       # Main HTML file with structure and controls
  ├── style.css        # Styles for layout, buttons, and cube display
  ├── script.js        # Cube logic, face rotation, scramble & solve
  ├── README.md        # Project documentation (this file)


## 🔧 Features
🔁 Face Rotations – Use U, R, F, D, L, B buttons

🎲 Scramble – Randomly shuffles the cube with 20 random moves

🧠 Solve – Reverses the move history to restore original state

🖍️ Color-coded State – Each cubelet represented by a colored letter

🧾 Move History – Internally tracked to enable accurate reversal
