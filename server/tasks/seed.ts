const addAdmin = async () => {
  console.info("User \"admin\" added");
  await useDB().insert(tables.admins).values({
    username: "admin",
    password: "admin"
  }).onConflictDoNothing().run();
};

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task"
  },
  async run () {
    await addAdmin();
    return { result: "success" };
  }
});
