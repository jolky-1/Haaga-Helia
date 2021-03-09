import React from "react";

function Todotable(props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <h4>Date</h4>
            </td>
            <td>
              <h4>Description</h4>
            </td>
          </tr>
          {props.todos.map((todo, index) => (
            <tr key={index}>
              <td className="date">{todo.date}</td>
              <td>{todo.desc}</td>
              <td>
                <button onClick={() => props.deleteTodo(index)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todotable;
