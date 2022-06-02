import { useState } from "react";

import styles from "./App.module.scss";

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "Пойти в магазин" },
        { id: 2, title: "Выкинуть мусор" },
        { id: 3, title: "Полить цветы" },
      ],
    },
    {
      id: 2,
      title: "Проверить",
      items: [
        { id: 4, title: "Код ревью" },
        { id: 5, title: "Алгоритмические задачи" },
        { id: 6, title: "Проверить уроки" },
      ],
    },
    {
      id: 3,
      title: "Сделано",
      items: [
        { id: 7, title: "Снять видое" },
        { id: 8, title: "Смотрировать" },
        { id: 9, title: "Залить на ютуб" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "App_item__xSqnm") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }

        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b;
      })
    );
  };

  const dropCardHendler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }

        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b;
      })
    );
  };

  return (
    <div className={styles.app}>
      {boards.map((board) => (
        <div
          className={styles.board}
          key={board.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHendler(e, board)}
        >
          <div className={styles.title}>{board.title}</div>
          {board.items.map((item) => (
            <div
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              className={styles.item}
              key={item.id}
              draggable
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
