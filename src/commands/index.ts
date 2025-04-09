/** 커맨드 인터페이스 */
interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}
export default Command;
