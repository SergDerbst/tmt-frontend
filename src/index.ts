import * as $ from "jquery";
import msg from "./content";
import "./message.scss";

$(() => {
    $("<div id='message'>")
        .text(msg + " barotsch")
        .appendTo("body");
});
