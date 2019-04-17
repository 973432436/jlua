import { SourceLoc } from "../lexer";

export class NodeType {
  static Error = "Error";
  static Chunk = "Chunk";
  static Comment = "Comment";
  static Identifier = "Identifier";
  static StringLiteral = "StringLiteral";
  static BooleanLiteral = "BooleanLiteral";
  static NumericLiteral = "NumericLiteral";
  static NilLiteral = "NilLiteral";
  static BinaryExpression = "BinaryExpression";
  static MemberExpression = "MemberExpression";
  static UnaryExpression = "UnaryExpression";
  static CallExpression = "CallExpression";
  static SequenceExpression = "SequenceExpression";
  static AssignmentExpression = "AssignmentExpression";
  static Function = "Function";
  static BlockStatement = "BlockStatement";
  static BreakStatement = "BreakStatement";
  static DoStatement = "DoStatement";
  static WhileStatement = "WhileStatement";
  static RepeatStatement = "RepeatStatement";
  static ForStatement = "ForStatement";
  static ForInStatement = "ForInStatement";
  static VariableDeclaration = "VariableDeclaration";
  static ReturnStatement = "ReturnStatement";
}

export class Node {
  type = NodeType.Error;
  loc = new SourceLoc();
}

export class Statement extends Node {}

export class LastStatement extends Statement {}

export class Chunk {
  type = NodeType.Chunk;
  /** @type {Array<Statement|LastStatement>} */
  body = [];
}

export class Comment extends Node {
  type = NodeType.Comment;
  text = "";
}

export class Identifier extends Node {
  type = NodeType.Identifier;
  name = "";
}

export class Expression extends Node {}

export class Literal extends Expression {}

export class StringLiteral extends Literal {
  type = NodeType.StringLiteral;
  value = "";
}

export class BooleanLiteral extends Literal {
  type = NodeType.BooleanLiteral;
  value = false;

  setValue(v) {
    if (typeof v === "string") this.value = v === "true";
    else this.value = v;
  }
}

export class NumericLiteral extends Literal {
  type = NodeType.NumericLiteral;
  value = 0;

  setValue(v) {
    if (typeof v === "string") this.value = parseFloat(v);
    else this.value = v;
  }
}

export class BinaryExpression extends Expression {
  type = NodeType.BinaryExpression;
  operator = "";
  /** @type Expression|Identifier */
  left = null;
  /** @type Expression|Identifier */
  right = null;
}

export class UnaryExpression extends Expression {
  type = NodeType.UnaryExpression;
  operator = "";
  /** @type Expression */
  argument = null;
}

export class NilLiteral extends Literal {
  type = NodeType.NilLiteral;
}

export class MemberExpression extends Expression {
  type = NodeType.MemberExpression;
  /** @type Expression */
  object = null;
  /** @type Expression */
  property = null;
  computed = false;
}

export class CallExpression extends Expression {
  type = NodeType.CallExpression;
  /** @type Expression */
  callee = null;
  /** @type Expression[] */
  args = [];
}

export class SequenceExpression extends Expression {
  type = NodeType.SequenceExpression;
  /** @type Array<Expression|Identifier> */
  expressions = [];
}

export class AssignmentExpression extends Expression {
  type = NodeType.AssignmentExpression;
  /** @type SequenceExpression */
  left = null;
  /** @type SequenceExpression */
  right = null;
}

export class BlockStatement extends Statement {
  type = NodeType.BlockStatement;
  /** @type Statement[] */
  body = [];
}

export class BreakStatement extends Statement {
  type = NodeType.BreakStatement;
  label = null;
}

export class DoStatement extends Statement {
  type = NodeType.DoStatement;
  /** @type Statement[] */
  body = [];
}

export class WhileStatement extends Statement {
  type = NodeType.WhileStatement;
  /** @type Expression */
  test = null;
  /** @type Statement[] */
  body = null;
}

export class RepeatStatement extends Statement {
  type = NodeType.RepeatStatement;
  /** @type Expression */
  test = null;
  /** @type Statement[] */
  body = null;
}

export class ForStatement extends Statement {
  type = NodeType.ForStatement;
  /** @type AssignmentExpression */
  exp1 = null;
  /** @type Expression */
  exp2 = null;
  /** @type Expression */
  exp3 = null;
  /** @type Statement[] */
  body = null;
}

export class ForInStatement extends Statement {
  type = NodeType.ForInStatement;
  /** @type Identifier[] */
  nameList = [];
  /** @type Expression[] */
  expList = [];
  /** @type Statement[] */
  body = [];
}

export class VariableDeclaration extends Statement {
  type = NodeType.VariableDeclaration;
  /** @type Identifier[] */
  nameList = null;
  /** @type Expression[] */
  expList = null;
}

export class FunctionDefStmt extends Node {
  type = NodeType.Function;
  /** @type Identifier */
  id = null;
  params = [];
  body = null;
  isLocal = false;
}

export class ReturnStatement extends Statement {
  type = NodeType.ReturnStatement;
  /** @type Expression[] */
  body = [];
}