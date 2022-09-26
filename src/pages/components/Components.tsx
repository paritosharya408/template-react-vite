import { useState } from 'react'
import { Autocomplete } from '../../components/autocomplete'
import { Button } from '../../components/button'
import { Select } from '../../components/select'
import { TextField } from '../../components/text-field'

export function Components() {
  const data = [
    { name: 'test1', value: 1 },
    { name: 'test2', value: 2 },
    { name: 'test3', value: 3 },
    { name: 'test4', value: 4 },
  ]
  const [value, setValue] = useState<typeof data[0] | undefined>(data[0])
  const [selectedValue, setSelectedValue] = useState()
  const [inputVal, setInputVal] = useState('')

  return (
    <div className="container">
      <h3>Input</h3>
      <TextField
        placeholder="Text"
        name="Input"
        type="text"
        value={inputVal}
        onChange={(event) => setInputVal(event.target.value)}
      />
      <h3>Select</h3>
      <Select
        value={value}
        options={data}
        onChange={(option) => setValue(option)}
      />
      <h3>Autocomplete</h3>
      <Autocomplete
        options={data}
        placeholder="Search.."
        selectedValue={(val: any) => setSelectedValue(val)}
      />
      <h3>Button</h3>
      <Button>Click me!</Button>
    </div>
  )
}
