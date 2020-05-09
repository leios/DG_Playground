using LinearAlgebra

"""
conjugate_gradient!(L, x⁰, b; P = x->x, tolerance = eps(1.0), maximum_iterations = length(x⁰), track_residual = false)

# Description

- An implementation of conjugate gradient. Solves Lx = b

# Arguments
- 'L': (function), a linear operator
- 'x⁰': (vector), initial condition, [OVERWRITTEN]
- 'b': (vector), right-hand side

# Keyword Arguments

- 'P': (function). This is the preconditioner. The default is the identity function x->x.
- 'tolerance': (number). relative error tolerance. default = eps(1.0)
- 'maximum_iterations': (integer). default = length(x⁰), Maximum iterations for conjugate gradient
- 'track residual': (boolean). keeps track of norm of residual and returns it

# Return
- Nothing if track_residual is false. the norm of the residual if track_residual is true

"""
function conjugate_gradient!(L, x⁰, b; P = x->x, tolerance = eps(1.0), maximum_iterations = length(x⁰), track_residual = false)
    # calculate the residual and auxillary field
    r⁰ = b - L(x⁰)
    z⁰ = P(r⁰)
    p⁰ = copy(z⁰)
    println("At iteration " * string(0) * " the (1) p0 vector is ")
    println(p⁰)
    if track_residual
        r_tracked = []
        push!(r_tracked, norm(r⁰))
    end
    # check to see if the guess was fantastic
    if tolerance_boolean(r⁰, b, tolerance)
        return nothing
    end

    # start searching
    for j in 1:maximum_iterations
        # create search step size
        Lp = L(p⁰)
        α = (r⁰' * z⁰) / (p⁰' * Lp)
        # update along preconditioned direction
        @. x⁰ += α * p⁰
        # form new residual
        r¹ = r⁰ - α .* Lp

        println("At iteration " * string(j) * " the residual is ")
println(r¹)

        # check to see if the update was reasonable
        if track_residual
            push!(r_tracked, norm(r¹))
        end
        if tolerance_boolean(r¹, b, tolerance)
            # track it
            if track_residual
                return r_tracked
            else
                return nothing
            end
        end
        # update p⁰
        z¹ = P(r¹)
        β  = (z¹' * r¹) / (z⁰' * r⁰)
        println("At iteration " * string(j) * " the (1) p0 vector is ")
        println(p⁰)
        # update
        @. p⁰ = z¹ + β * p⁰
        @. z⁰ = z¹
        @. r⁰ = r¹
        println("At iteration " * string(j) * " the state vector is ")
println(x⁰)
println("At iteration " * string(j) * " the p0 vector is ")
println(p⁰)
println("At iteration " * string(j) * " the beta is ")
println(β)
    end
    if track_residual
        return r_tracked
    end
    return nothing
end


"""
tolerance_boolean(r, b, tolerance)

# Description
- Calculates tolerance

# Arguments
- 'r': (vector), the residual
- 'b': (vector), takes into account relative size
- 'tolerance': checks the tolerance

# Return
- boolean value: true or false
"""
function tolerance_boolean(r, b, tolerance)
    return norm(r)/norm(b) < tolerance
end
