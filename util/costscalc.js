/**
 * Created by voldemarich on 25.11.2017.
 */
//** constants **//
const per_km = 0.5;
const per_kg = 1.6;
const liquid_coefficient = 1.2;
const gas_coefficient = 1.5;
const fragility = 1.1;
const speciality = 1.3;

exports.calculate = function(order_json)
{
  sum = 0;
  sum = order_json.distance*per_km + order_json.weight*per_kg;
  if(order_json.goods_type === "liquid") sum *= liquid_coefficient;
  if(order_json.goods_type === "gas") sum *= gas_coefficient;
  if(order_json.shake_level !== "no_importance") sum *= fragility;
  if(order_json.goods_special !== "not_special") sum *= speciality;
  return sum;
};