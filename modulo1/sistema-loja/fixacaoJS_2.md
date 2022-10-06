ˋˋˋ
function calculaPrecoTotal(quantidade) {
  // Escreva seu código aqui
  let preco = 0
  if(quantidade < 12){
    preco = 1.30
  }else if(quantidade >=12){
    preco = 1
  }
  const custoTotal = preco * quantidade
  return custoTotal
}
ˋˋˋ