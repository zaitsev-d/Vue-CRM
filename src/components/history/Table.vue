<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Open</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, index) of records" :key="record.id">
                <td>{{ index + 1 }}</td>
                <td>{{ record.amount | currency('PLN') }}</td>
                <td>{{ record.date | date('datetime') }}</td>
                <td>{{ record.categoryName }}</td>
                <td>
                    <span :class="[record.typeClass]"
                    class="white-text badge red">{{ record.typeText }}</span>
                </td>
                <td>
                    <button
                    v-tooltip="'View record'"
                    class="btn-small btn" 
                    @click="$router.push('/detail/' + record.id)">
                    <i class="material-icons">open_in_new</i>
                    </button>
                </td>
            </tr>
        </tbody>
      </table>
</template>

<script>
export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>