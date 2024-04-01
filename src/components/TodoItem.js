import React from "react";

function TodoItem(props) {
    if (props.sender === "user") {
        return (
                <li className="list-group-item d-flex justify-content-between align-items-center mt-3 rounded-5 p-3 border-1 border-secondary shadow-sm mw-75 me-4" id="listItem1">
                    {props.title}

                </li>
        );
    }
    if (props.sender === "bot" && props.link1 !== "") {
        return (
                <li className="list-group-item  justify-content-between align-items-center mt-3 rounded-5 justify-content-start p-3 border-1 border-secondary shadow-sm mw-75 ms-4" id="listItem2">
                    <p>Here are some suggested resources: </p>
                    <div className="rounded-5 border-secondary border-2" id="botResource"><a href={props.link1} target="blank">{props.res1}</a></div>
                    <div className="" id="botResource"><a href={props.link2} target="blank">{props.res2}</a></div>
                    <div className="" id="botResource"><a href={props.link3} target="blank">{props.res3}</a></div>
                </li>
        );


    }
    if (props.sender === "bot" && props.link1 === "") {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center mt-3 rounded-5 justify-content-start p-3 border-1 border-secondary shadow-sm mw-75 ms-4" id="listItem2">
                {props.title}
            </li>
        );


    }

}

export default TodoItem;