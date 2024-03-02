import React, { useCallback, useMemo, useRef, useState } from "react";
import "./ModalComponent.css";
import { ITableProp } from "../../utils/types/i-table";

/*
 Используется для сброса значений ввода в модальном окне.
*/
const STOCK_ROW = {
  name: "",
  age: undefined,
  address: "",
  position: "",
  salary: undefined,
};

/*
 Компонент модального окна, позволяющий пользователям добавлять новую строку в таблицу.
 param {function} closeModal - Функция закрытия модального окна.
 param {function} onAddRow - Функция добавления новой строки в таблицу.
*/
const ModalComponent = ({ closeModal, onAddRow }) => {
  const [inputValues, setInputValues] = useState<ITableProp>(STOCK_ROW);

  /*
   Функция обратного вызова, обновляющая значения ввода при вводе пользователем текста в поле ввода.
   param {React.ChangeEvent<HTMLInputElement>} event - Объект события изменения.
  */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  /*
   Функция обратного вызова, обрабатывающая отправку формы и добавляющая новую строку в таблицу.
   param {React.FormEvent<HTMLFormElement>} event - Объект события отправки формы.
  */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Проверка, есть ли в введенных данных пустые поля и вывод предупреждения
    if (Object.values(inputValues).includes("")) {
      alert("Заполните форму");
      return;
    }

    // Добавление новой строки и сброс значений ввода
    onAddRow(inputValues);
    setInputValues(STOCK_ROW);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <form onSubmit={handleSubmit} className="form-style">
            <label htmlFor="Name" className="label-style">
              Имя:
            </label>
            <input
              type="text"
              id="Name"
              name="name"
              value={inputValues.name}
              onChange={handleChange}
              className="input-style"
            />
            <label htmlFor="Age" className="label-style">
              Возраст:
            </label>
            <input
              type="text"
              id="Age"
              name="age"
              value={inputValues.age}
              onChange={handleChange}
              className="input-style"
            />
            <label htmlFor="Address" className="label-style">
              Адрес:
            </label>
            <input
              type="text"
              id="Address"
              name="address"
              value={inputValues.address}
              onChange={handleChange}
              className="input-style"
            />
            <label htmlFor="Position" className="label-style">
              Должность:
            </label>
            <input
              type="text"
              id="Position"
              name="position"
              value={inputValues.position}
              onChange={handleChange}
              className="input-style"
            />
            <label htmlFor="Salary" className="label-style">
              Оклад:
            </label>
            <input
              type="text"
              id="Salary"
              name="salary"
              value={inputValues.salary}
              onChange={handleChange}
              className="input-style"
            />
            <div className="buttons-style">
              <button type="submit" className="submit-button-style">
                Сохранить
              </button>
              <button
                className="close-button-style"
                onClick={() => closeModal()}
              >
                Закрыть
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
