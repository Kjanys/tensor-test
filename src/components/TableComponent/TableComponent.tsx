import React, { useEffect, useState } from "react";
import "./TableComponent.css";
import dataJSON from "../../mocks/data.json";
import { ITableProp } from "../../utils/types/i-table";
import ModalComponent from "../ModalComponent/ModalComponent.tsx";
import Modal from "react-modal/lib/components/Modal.js";

// Константы для таблицы
const STOCK_TABLE_ROWS_NUMBER = 30;
const TABLE_ROWS_ADDING_NUMBER = 20;
const TABLE_ROWS_SCROLL_OFFSET = 50;

/*
 Компонент TableComponent, отображающий данные в виде таблицы и обрабатывающий
 загрузку дополнительных данных, удаление строк и добавление новых строк.
*/
const TableComponent: React.FC = () => {
  const [data, setData] = useState<ITableProp[]>(
    dataJSON.slice(0, STOCK_TABLE_ROWS_NUMBER)
  );
  const [currentDataSize, setCurrentDataSize] = useState(data.length);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /*
  Функция loadMoreData, загружающая дополнительные данные при прокрутке
  пользователем до определенного смещения.
 */
  const loadMoreData = () => {
    const nimberOfRowsToAdd =
      currentDataSize + TABLE_ROWS_ADDING_NUMBER < dataJSON.length
        ? currentDataSize + TABLE_ROWS_ADDING_NUMBER
        : dataJSON.length;
    setData(data.concat(dataJSON.slice(currentDataSize, nimberOfRowsToAdd)));
    setCurrentDataSize(nimberOfRowsToAdd);
  };

  /**
  Функция handleDeleteRow, удаляющая строку по определенному индексу.
  param {number} index - Индекс удаляемой строки.
 */
  const handleDeleteRow = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    setCurrentDataSize(newData.length);
  };

  /**
  Функция onAddRow, добавляющая новую строку в таблицу.
  param {ITableProp} newTableProp - Данные новой строки.
 */
  const onAddRow = (newTableProp: ITableProp) => {
    setData([...data, newTableProp]);
    setCurrentDataSize(data.length + 1);
    setModalIsOpen(false);
  };

  /**
  Хук useEffect, добавляющий обработчик события прокрутки к контейнеру данных
  для обнаружения момента, когда пользователь прокрутил до определенного смещения.
 */
  useEffect(() => {
    const dataContainer = document.getElementById("data-container");
    if(!dataContainer) return;

    // функция проверки скрола
    const handleScrollEvent = () => {
      if (
        dataContainer &&
        dataContainer.offsetHeight +
          dataContainer.scrollTop +
          TABLE_ROWS_SCROLL_OFFSET >
          dataContainer.scrollHeight
      ) {
        loadMoreData();
      }
    };
    dataContainer.addEventListener("scroll", handleScrollEvent);

    // удаляем слушателя для избежания утечек памяти
    return () => {
      if (dataContainer) {
        dataContainer.removeEventListener("scroll", handleScrollEvent);
      }
    };
  }, [currentDataSize]);

  /**
   * Функция closeModal, закрывающая модальное окно.
   */
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="table-container">
      <Modal
        isOpen={modalIsOpen}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <ModalComponent closeModal={closeModal} onAddRow={onAddRow} />
      </Modal>
      <div id="data-container" style={{ height: "100vh", overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Адрес</th>
              <th>Должность</th>
              <th>Оклад</th>
              <th>
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="add-button"
                >
                  Добавить сотрудника
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item.position}</td>
                <td>{item.salary}</td>
                <td>
                  <button
                    onClick={() => handleDeleteRow(index)}
                    className="delete-button"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
