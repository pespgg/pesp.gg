const addAdmin = async () => {
  console.info("User \"admin\" added");
  await useDB().insert(tables.admins).values({
    username: "admin",
    password: hash("admin", useRuntimeConfig().secure.salt)
  }).onConflictDoUpdate({
    target: tables.admins.id,
    set: {
      password: sql`excluded.password`
    }
  }).run();
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
