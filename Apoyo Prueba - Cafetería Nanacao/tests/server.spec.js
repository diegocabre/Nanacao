const request = require("supertest");
const app = require("../index.js");

describe("Test de rutas del servidor", () => {
  it("Debería devolver un status code 200 y un arreglo con al menos un objeto en GET /cafes", async () => {
    const response = await request(app).get("/cafes");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Debería devolver un status code 404 al intentar eliminar un café con un id que no existe en DELETE /cafes/:id", async () => {
    const response = await request(app).delete("/cafes/999");
    expect(response.statusCode).toBe(404);
  });

  it("Debería agregar un nuevo café y devolver un status code 201 en POST /cafes", async () => {
    const newCafe = {
      id: 101,
      name: "Nuevo Café",
    };
    const response = await request(app).post("/cafes").send(newCafe);
    expect(response.statusCode).toBe(201);
  });

  it("Debería devolver un status code 400 en PUT /cafes si intentas actualizar un café enviando un id diferente en los parámetros y en el payload", async () => {
    const cafeToUpdate = {
      id: 102,
      name: "Café Actualizado",
    };
    const response = await request(app).put("/cafes/1").send(cafeToUpdate);
    expect(response.statusCode).toBe(400);
  });
});
