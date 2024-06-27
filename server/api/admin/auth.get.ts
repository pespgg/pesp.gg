export default defineEventHandler(async (event): Promise<PespSession> => {
  return await requireUserSession(event);
});
