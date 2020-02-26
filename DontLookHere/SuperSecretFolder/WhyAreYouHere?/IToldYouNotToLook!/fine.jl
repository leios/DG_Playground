# Why?

abstract type AbstractFruit end
abstract type AbstractFruitCombo end

import Base: +, *, /, -
import LinearAlgebra: ⋅

expr = :(1+1)
eval(expr)
a = 3
b = 4
expr = :($a+$b)
eval(expr)


struct Apple{𝒯, 𝒮, 𝒰} <: AbstractFruit
    delicious::𝒯
    nutricious::𝒮
    eaten::𝒰
end

struct Banana{𝒯, 𝒮, 𝒰, 𝒱} <: AbstractFruit
    delicious::𝒯
    nutricious::𝒮
    eaten::𝒰
    peeled::𝒱
end

# A tuple of fruits
struct Fruple{N} <: AbstractFruitCombo
    fruits::NTuple{N,AbstractFruit}
end

function +(🍎::AbstractFruit, 🍌::AbstractFruit)
    return Fruple{2}((🍎,🍌))
end

function +(🍎🍎::Fruple{N}, 🍌🍌::Fruple{M}) where {N, M}
    return Fruple{N + M}((🍎🍎.fruits..., 🍌🍌.fruits...))
end

function +(🍎::AbstractFruit, 🍎🍌::Fruple{M}) where M
    return Fruple{1 + M}((🍎🍌.fruits..., 🍎))
end

function +(🍎🍌::Fruple{M}, 🍎::AbstractFruit) where M
    return Fruple{1 + M}((🍎🍌.fruits..., 🍎))
end
###
# test
🍎 = Apple(1,2,3)
🍌 = Banana(1,2,3,4)
🍎🍌 = 🍎+🍌

fruit_bowl = 🍎🍌 + 🍎🍌 + 🍎🍌

fruit_bowl = fruit_bowl + 🍎
