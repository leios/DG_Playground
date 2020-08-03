# Define Struct and Symbol Overload for Unary Operators
for unary_operator in unary_operators
    b_name, b_symbol = Meta.parse.(unary_operator)
    @eval struct $b_name{𝒯} <: UnaryOperation
        term::𝒯
    end
    @eval $b_symbol(a::AbstractExpression) = $b_name(a)
end

# Define Struct and Symbol Overload for Binary Operators
for binary_operator in binary_operators
    b_name, b_symbol = Meta.parse.(binary_operator)
    @eval struct $b_name{𝒯, 𝒮} <: BinaryOperation
        term1::𝒯
        term2::𝒮
    end
    @eval $b_symbol(a::AbstractExpression, b::AbstractExpression) = $b_name(a, b)
end

# Define Struct and Symbol Overload for n-ary Operators
for nary_operator in nary_operators
    n_name, n_symbol = Meta.parse.(nary_operator)
    @eval struct $n_name{a} <: NaryOperation
        terms::Vector{a}
    end
    @eval $n_symbol(a::Vector{AbstractExpression}) = $n_name(a...)
end

# Special Structs
struct Gradient{𝒯, 𝒰} <: AbstractExpression
    operand::𝒯
    metadata::𝒰
end

# Special Rules
-(a::AbstractExpression, b::AbstractExpression) = a + -b
