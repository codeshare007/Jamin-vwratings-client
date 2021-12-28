<template>
  <div class="interviewView">
    <EntityInterviewView entities="parties" :id="this.id" />
  </div>
</template>
<script>
import EntityInterviewView from '@/components/entities/EntityInterviewView'
export default {
  props: ['id'],
  components: {
    EntityInterviewView
  }
}
</script>