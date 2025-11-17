function greeting() {
  const username = prompt("Введите имя пользователя");
  throw Error('Имя обязательно для заполнения')
}
try { 
  greeting();
} catch(error) { 
  alert(error.message);
}