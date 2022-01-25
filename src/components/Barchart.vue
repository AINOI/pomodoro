<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['1/7', '1/8', '1/9', '1/10', '1/11', '1/12'],
      datasets: [
        {
          backgroundColor: '#6C9460',
          data: [0, 1, 2, 3, 1, 2]
        }
      ]
    })
  }
}
</script>
