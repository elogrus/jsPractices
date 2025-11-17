function globalError() {
    const error = Error("Глобальная ошибка");
    error.name = "GlobalError";
    throw error;
}

function localError() {
    const error = Error("Локальная ошибка");
    error.name = "LocalError";
    throw error;
}

function testErrorScope(fn) {
    try {
        fn();
    } catch (error) {
        switch (error.name) {
            case "LocalError":
                console.log("Обнаружена локальная ошибка");
                break;
            case "GlobalError":
                console.log("Обнаружена глобальная ошибка");
                break;
        }
        console.error(error);
    }
}
testErrorScope(localError);
testErrorScope(globalError);
