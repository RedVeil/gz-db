import { Person } from "@/lib/types"
import { test } from "@/lib/test"

export default function getPeople(): Person[] {
  return test.split("\n").slice(2, -1).map(p => p.split(", ")).map(p => {
    return {
      id: Number(p[1]),
      name: p[2],
      sex: p[3],
      age: Number(p[4])
    }
  })
}