package org.loop.example

import android.app.Application
import android.location.LocationManager
import javax.inject.Inject
import javax.inject.Named


/**
 * Created by loop on 09/12/14.
 */

class MyApplication : Application() {

    companion object {
        //platformStatic allow access it from java code
        @JvmStatic lateinit var graph: ApplicationComponent
    }

    @Inject
    lateinit var locationManager: LocationManager

    @field:[Inject Named("somethingElse")]
    lateinit var somethingElse: String

    override fun onCreate() {
        super.onCreate()
        graph = DaggerApplicationComponent.builder().androidModule(AndroidModule(this)).build()
        graph.inject(this)

        println("App: $locationManager")
        //TODO do some other cool stuff here
    }
}