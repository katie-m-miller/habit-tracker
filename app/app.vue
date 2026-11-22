<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UCheckbox = resolveComponent('UCheckbox')
const today = new Date()

type Habit = {
  id: string
  name: string
  completedDays: number[]
}

const data = ref<Habit[]>([
  { id: '1', name: 'Drink water', completedDays: [] },
  { id: '2', name: 'Exercise', completedDays: [] },
  { id: '3', name: 'Read', completedDays: [] }
])

function updateHabitCompletion(habitId: string, day: number, completed: boolean) {
  data.value = data.value.map((habit) => {
    if (habit.id !== habitId) {
      return habit
    }

    const completedDays = new Set(habit.completedDays)
    if (completed) {
      completedDays.add(day)
    } else {
      completedDays.delete(day)
    }

    return { ...habit, completedDays: [...completedDays] }
  })
}

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const columns: TableColumn<Habit>[] = [
  {
    accessorKey: 'name',
    header: 'Habit',
    meta: {
      class: {
        th: 'sticky left-0 z-30 w-48 min-w-48 border border-accented bg-elevated px-3 text-left',
        td: 'sticky left-0 z-20 w-48 min-w-48 border border-accented bg-default px-3 font-medium'
      }
    }
  },
  ...Array.from({ length: getDaysInMonth(today) }, (_, index) => {
    const day = index + 1

    return {
      id: `day-${day}`,
      header: String(day),
      cell: ({ row }: { row: { original: Habit } }) => h(
        'div',
        { class: 'flex h-10 w-full items-center justify-center' },
        [h(UCheckbox, {
          modelValue: row.original.completedDays.includes(day),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
            updateHabitCompletion(row.original.id, day, value === true)
          },
          'aria-label': `Mark ${row.original.name} complete on day ${day}`
        })]
      ),
      meta: {
        class: {
          th: 'w-10 min-w-10 border border-accented bg-elevated px-1 text-center',
          td: 'h-10 w-10 min-w-10 border border-accented p-0 text-center'
        }
      }
    }
  })
]

function getMonthName(monthNumber: number, locale = 'en-US') {
  const date = new Date(2000, monthNumber - 1, 1)
  return date.toLocaleString(locale, { month: 'long' })
}

const headerTitle = computed(() => `${getMonthName(today.getMonth() + 1)} ${today.getFullYear()}`)
</script>

<template>
  <UPageHeader
    headline="Habit Tracker"
    :title="headerTitle"
  />
  <div class="flex-1 w-full">
    <div class="overflow-x-auto rounded-lg border border-accented">
      <UTable
        :data="data"
        :columns="columns"
        sticky="header"
        class="h-96 min-w-max"
      />
    </div>
  </div>
</template>
