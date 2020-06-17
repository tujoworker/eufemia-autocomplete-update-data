import React from 'react'
// import './styles.css'
import 'dnb-ui-lib/style'
import { Autocomplete, Button } from 'dnb-ui-lib'

const initialData = [
  { selected_value: '1', content: '1' },
  { selected_value: '2', content: '2' },
  { selected_value: '3', content: '3' },
  { selected_value: '4', content: '4' }
]

export default function App() {
  const [choiceData, setChoiceData] = React.useState(initialData)
  const [selectedData, setSelectedData] = React.useState([])

  return (
    <>
      <pre>
        Selected data:{' '}
        {selectedData.map(item => (
          <Button
            key={item.selected_value}
            size="small"
            on_click={() => {
              const updatedSelectedData = selectedData.filter(
                ({ selected_value }) => item.selected_value !== selected_value
              )
              setSelectedData(updatedSelectedData)
              setChoiceData(
                initialData.filter(
                  ({ selected_value }) =>
                    updatedSelectedData.findIndex(
                      ({ selected_value: updatedValue }) =>
                        updatedValue === selected_value
                    ) === -1
                )
              )
            }}
          >
            {item.content}
          </Button>
        ))}
      </pre>

      <Autocomplete
        title="Choose an item"
        prevent_selection
        data={choiceData}
        on_change={({ data, setInputValue }) => {
          // update our choices
          setChoiceData(
            choiceData.filter(
              item => item.selected_value !== data.selected_value
            )
          )

          // only update selected data if they do not exists in the list
          if (
            selectedData.findIndex(
              ({ selected_value }) => selected_value === data.selected_value
            ) === -1
          ) {
            setSelectedData([...selectedData, data])
          }

          // only to reset keyboard input values
          setInputValue(null)
        }}
      />
    </>
  )
}
