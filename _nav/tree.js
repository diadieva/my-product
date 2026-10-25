// Дерево сторінок репо — єдине джерело для навігатора (_nav/nav.js).
// Елемент із href — сторінка; без href — гілка. children — вкладені сторінки (наприклад, стани екрана).
// href — шлях від кореня репо. У дереві лише сторінки, які вже існують;
// гілка з'являється разом зі своєю першою сторінкою.
//
// Приклад гілки:
// { title: "Research", children: [
//   { title: "Екран", href: "research/screens/screen.html", children: [
//     { title: "Порожній стан", href: "research/screens/screen-empty.html" }
//   ] }
// ] }

window.NAV_TREE = [
  { title: "Старт", href: "index.html" },
  { title: "Ресерч", children: [
    { title: "Підсумок дослідження", href: "research/research.html" }
  ] }
];
