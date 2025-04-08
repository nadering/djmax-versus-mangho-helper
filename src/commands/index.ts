interface Command {
  execute(): void;
  undo(): void;
}
export default Command;

export const MAXIMUM_PLAYER = 8;
