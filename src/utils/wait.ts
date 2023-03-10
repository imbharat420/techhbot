const wait = async (ms: number): Promise<void> => {
  new Promise((r) => setTimeout(r, ms));
};
export default wait;
