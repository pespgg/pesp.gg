export default eventHandler(async (event): Promise<PespSession> => {
  return await requireUserSession(event);
});
