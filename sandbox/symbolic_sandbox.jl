using SymbolicUtils.Rewriters
using SymbolicUtils

acr = @acrule +(~~x) + +(~~y) => +((~~x)..., (~~y)...)

@syms x y z w
expr = (x + y + z) + (w+x+y)
println(rset(expr))

