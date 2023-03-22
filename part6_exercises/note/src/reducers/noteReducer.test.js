import { noteReducer } from "./noteReducer";
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    // NEW_NOTE test
    test('returns new state with acion NEW_NOTE', () => {
        const state = []
        const action = {
            type: 'NEW_NOTE',
            payload: {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.payload)
    })

    // TOGGLE_IMPORTANCE test
    test('returns new state with action TOGGLE IMPORTANCE', () => {
        const state = [
            {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            },
            {
                content: 'state changes are made with actions',
                important: false,
                id: 2
            }
        ]

        const action = {
            type: 'TOGGLE_IMPORTANCE',
            payload: {
                id: 2
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)
        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({
            content: 'state changes are made with actions',
            important: true,
            id: 2
        })
    })
})