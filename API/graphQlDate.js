const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// Function to validate and parse a date string
function parseDateString(value) {
  const dateValue = new Date(value);
  return isNaN(dateValue) ? undefined : dateValue;
}

// Custom GraphQL scalar type for Date
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',

  // Serialize: Convert Date to ISO string
  serialize: (value) => value.toISOString(),

  // ParseValue: Convert input value to Date
  parseValue: parseDateString,

  // ParseLiteral: Convert AST literal to Date
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? parseDateString(ast.value) : undefined),
});

// Export the GraphQLDate scalar type
module.exports = GraphQLDate;
