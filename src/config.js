export const API = "http://localhost:8000/api";

export const ROUTES = {
    landing_page: '/',
    login_page: '/login',
    create_account_page: '/signup',
    store_page: '/store',
    add_book_page: '/admin/book/add',
    manage_book_page: '/admin/book/manage',
    manage_categories_page: '/admin/category/manage',
    add_admin_user_page: '/admin/create/user',
}

export const columns = {
    category_table_columns : [
        {
            label :  "Category Id",
            field : "categoryId",
            sort : 'asc',
            width : 100
        },
        {
            label : "Category Name",
            field: "categoryName",
            sort:  "asc",
            width: 100
        },
        {
            label : "Action",
            field: "action",
            sort:  "asc",
            width: 100
        },
    ],
    books_table_columns : [
        {
            label :  "Book Id",
            field : "bookId",
            sort : 'asc',
            width : 100
        },
        {
            label : "Book Name",
            field: "bookName",
            sort:  "asc",
            width: 100
        },
        {
            label : "Price",
            field: "price",
            sort:  "asc",
            width: 150
        },
        {
            label : "Image",
            field: "image",
            sort:  "asc",
            width: 150
        },
        {
            label : "Action",
            field: "action",
            sort:  "asc",
            width: 100
        }
    ]
}

