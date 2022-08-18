from fastapi import FastAPI, Response
from pydantic import BaseModel
from sqlite3 import connect
from typing import Dict, List

app = FastAPI()
app.title = "Main API"

# https://www.youtube.com/watch?v=bX5NrUWHqyo

# Main route
@app.get("/")
def root() -> Dict:
    return {"message": "Hello World"}


# Create model
class User(BaseModel):
    name: str
    age: int
    password: str


class Query(BaseModel):
    value: str


# Create cursor
def open_cursor():
    conn = connect("main_db.db")
    cursor = conn.cursor()
    return conn, cursor


# Close connection
def close_cursor(conn, cursor):
    cursor.close()
    conn.close()


# Get all users
@app.get("/users/")
def get_users() -> List:
    conn, cursor = open_cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    close_cursor(conn, cursor)
    return users


# Get user by id
@app.get("/users/{user_id}")
def get_user(user_id: int, response: Response) -> List:
    conn, cursor = open_cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchall()
    close_cursor(conn, cursor)
    if not user:
        response.status_code = 404
        response.body = "User not found"
        return {"message": "User not found", "response": response}
    return user


# Any query
@app.post("/custom_query/{query_value}")
def get_query(query: Query, response: Response) -> List:
    conn, cursor = open_cursor()
    try:
        cursor.execute(query.value)
    except Exception as e:
        response.status_code = 400
        response.body = "Query error"
        return {"message": "Query Exception", "response": response}
    users = cursor.fetchall()
    close_cursor(conn, cursor)
    return users


# Create user
@app.post("/users/")
def create_user(user: User) -> Dict:
    conn, cursor = open_cursor()
    cursor.execute("INSERT INTO users VALUES (?, ?, ?, ?)",
                   (None, user.name, user.age, user.password))
    conn.commit()
    close_cursor(conn, cursor)
    print(User)
    return {"message": "User created"}


# Update user
@app.put("/users/{user_id}")
def update_user(user_id: int, user: User, response: Response) -> Dict:
    conn, cursor = open_cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    if not cursor.fetchall():
        close_cursor(conn, cursor)
        response.status_code = 404
        return {"message": "User not found"}
    cursor.execute("UPDATE users SET name = ?, age = ?, password = ? WHERE id = ?",
                   (user.name, user.age, user.password, user_id))
    conn.commit()
    close_cursor(conn, cursor)
    return {"message": f"User id {user_id} updated"}
